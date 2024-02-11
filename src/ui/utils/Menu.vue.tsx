// todo(tnl): add window focus manager; keyboard navigation; etc.

import { useWindowFocus } from "@vueuse/core";
import { Teleport, computed, defineComponent, effect, nextTick, onBeforeUpdate, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import type { ComponentPublicInstance, FunctionalComponent, PropType, Ref, ShallowReactive } from "vue";
import { useClickOutsideHandler } from "../../use/useClickOutsideHandler";

export type MenuItemSeperator = { seperator: true };
export type MenuItemSubMenu = DropdownMenu;
export type MenuItemButton = { label: string, onClick?: () => void, shortcut?: string, disabled?: boolean };
// export type MenuItemCheckbox = { label: string, checked: Ref<boolean> };
export type MenuItem = MenuItemButton | MenuItemSeperator | MenuItemSubMenu // | MenuItemCheckbox;
export type DropdownMenu = { label: string, items: (MenuItem)[] };
export type MenuBar = DropdownMenu[];

const isSeperator = (item: MenuItem): item is MenuItemSeperator => { return 'seperator' in item };
const isSubMenu = (item: MenuItem): item is MenuItemSubMenu => { return 'items' in item };

export const MenuItemSeperator = defineComponent({ name: "MenuItemSeperator", render: () => <hr style={{ borderTop: "1px solid #AAA", marginTop: "4px", marginBottom: "4px" }} /> });

export const MenuItemSubMenu = defineComponent({
    name: "MenuItemSubMenu",
    props: {
        subMenu: {
            type: Object as PropType<MenuItemSubMenu>,
            required: true
        }
    },
    setup(props) {
        const opened = ref(false);
        const subMenuRef = ref<HTMLButtonElement | null>(null);
        const subMenuOpenTimeout = 200; // ms
        let createSubMenuPosition = reactive({ x: 0, y: 0 });
        let timeoutHandler: ReturnType<typeof setTimeout>;
        let rect: DOMRect;

        const onHover = () => {
            timeoutHandler = setTimeout(() => {
                opened.value = true;
            }, subMenuOpenTimeout);
        }

        const onLeave = () => {
            clearTimeout(timeoutHandler);
        }

        onMounted(() => {
            rect = subMenuRef.value!.getBoundingClientRect();
            createSubMenuPosition.x = rect.x + rect.width + 4;
            createSubMenuPosition.y = rect.y;
        })

        const onClick = (e: PointerEvent) => {
            e.stopImmediatePropagation();
            opened.value = true;
        };

        const classes = (pressed: boolean) => `submenu-entry-btn flex items-center place-content-between h-7 hover:bg-slate-100 rounded-l-md cursor-default ${pressed ? "bg-slate-100" : ""}`;

        return () =>
            <>
                <button class={classes(opened.value)}
                    ref={subMenuRef} onPointerenter={onHover} onPointerleave={onLeave} onPointerdown={onClick}>
                    <span class='pl-5 text-xs'>{props.subMenu.label}</span>
                    <svg class='mr-1' viewBox="0 0 10 10" width="10px">
                        <polygon points="0,1 5,5 0,9" fill="#333" />
                    </svg>
                </button>
                <DropdownMenu menu={props.subMenu} opened={opened.value} position={createSubMenuPosition}></DropdownMenu>
            </>
    }
});

export const MenuItemButton = defineComponent({
    name: "MenuItemButton",
    props: {
        item: {
            type: Object as PropType<MenuItemButton>,
            required: true
        }
    },
    setup(props) {
        return () => <button class='dropdown-menu-btn flex items-center place-content-between h-7 hover:bg-slate-100 rounded-md cursor-default'
            onPointerdown={props.item.onClick}>
            <span class='pl-5 text-xs' >{props.item.label}</span>
            {props.item.shortcut ? <span class="ml-2 pr-4 text-xs text-neutral-600">{props.item.shortcut}</span> : null}
        </button>
    }
});

export const MenuItem: FunctionalComponent<{ item: MenuItem }> = (props) => {
    if (isSeperator(props.item)) {
        return <MenuItemSeperator></MenuItemSeperator>;
    } else if (isSubMenu(props.item)) {
        return <MenuItemSubMenu subMenu={props.item}></MenuItemSubMenu>;
    } else {
        return <MenuItemButton item={props.item}></MenuItemButton>;
    }
};

export const DropdownMenu = defineComponent({
    name: "DropdownMenu",
    props: {
        menu: {
            type: Object as PropType<DropdownMenu>,
            required: true
        },
        opened: {
            type: Boolean,
            required: true
        },
        position: {
            type: Object as PropType<{ x: number, y: number }>,
            default: () => { return { x: 0, y: 0 } }
        }
    },
    emits: ["shallClose"],
    setup(props, { emit, slots }) {
        const isOpen = computed(() => props.opened);

        useClickOutsideHandler([".dropdown-menu"], () => {
            emit("shallClose");
        });

        return () => <Teleport to="body">
            {isOpen.value ?
                <div class=".dropdown-menu min-w-[220px] flex flex-col bg-neutral-200 rounded-[4px] shadow-nodir p-1"
                    style={{ position: "absolute", left: `${props.position.x}px`, top: `${props.position.y}px` }}>
                    {slots.default ? slots.default() : null /* to add a little bit customization. */}
                    {props.menu.items.map((item: MenuItem) => <MenuItem item={item}></MenuItem>)}
                </div> : null
            }
        </Teleport>;
    },
});

export const MenuBar = defineComponent({
    name: "MenuBar",
    props: {
        menus: {
            type: Object as PropType<MenuBar>,
            required: true
        }
    },
    setup(props) {
        const menus = reactive(props.menus.map((m, index) => {
            return {
                ...m,
                id: index,
                position: { x: 0, y: 0 },
            }
        }));

        const menuShallOpen = ref(false);
        const currentOpenedMenu = ref(-1);

        let menuButtonRefs: (ComponentPublicInstance | Element)[] = [];

        const buttonClasses = (pressed: boolean) => `dropdown-menu-btn cursor-default py-0.5 px-2 font-sans text-xs rounded-sm active:bg-neutral-400 ${pressed ? "bg-neutral-400" : "hover:bg-slate-200"}`;
        const inlinedStyle = "app-region: no-drag; -webkit-app-region: no-drag;";

        useClickOutsideHandler([".dropdown-menu-btn", ".submenu-entry-btn"], () => {
            menuShallOpen.value = false;
        });

        function windowKeyHandler(e: KeyboardEvent) {
            if (e.key == "Escape") {
                menuShallOpen.value = false;
            }
        }

        onMounted(() => {
            window.addEventListener("keyup", windowKeyHandler);

            (menuButtonRefs as HTMLButtonElement[]).forEach((button, index) => {
                const rect = button.getBoundingClientRect();
                menus[index].position = { x: rect.x, y: rect.y + rect.height + 1 /* 1px for aesthetic */ };
            })
        });

        onUnmounted(() => {
            window.removeEventListener("keyup", windowKeyHandler);
        });

        return () =>
            <div role="menubar" class='flex bg-neutral-300'>
                {
                    menus.map((menu, id) => {
                        const pressed = computed(() => menuShallOpen.value && currentOpenedMenu.value === id);
                        return <div role="menu" title={menu.label} class="flex pl-1 items-center" key={menu.label} style={inlinedStyle}>
                            <button class={
                                buttonClasses(pressed.value)
                            }
                                onClick={() => {
                                    menuShallOpen.value = true;
                                    currentOpenedMenu.value = menu.id;
                                }}
                                onMouseenter={
                                    () => {
                                        if (menuShallOpen.value) {
                                            currentOpenedMenu.value = menu.id;
                                        }
                                    }
                                }
                                ref={
                                    (el) => {
                                        if (el) {
                                            menuButtonRefs[menu.id] = el;
                                        }
                                    }}
                            >
                                {menu.label}
                            </button>
                            <DropdownMenu menu={menu} opened={pressed.value} position={menu.position} onShallClose={() => menuShallOpen.value = false}></DropdownMenu>
                        </div>
                    })}
            </div>
    }
});