import { createVNode, defineComponent, h, renderSlot, type PropType, type SlotsType, type VNode, ref, computed } from "vue";

// TODO(tl): to remember selected tab for each container.

const defaultTabContent = "This tab is empty.";

export const Tab = defineComponent({
    name: "TabContent",
    props: {
        label: {
            type: String,
            required: true
        }
    },
    setup(props, ctx) {
        return () => ctx.slots.default ? ctx.slots.default() : defaultTabContent;
    }
});

export const TabSelector = defineComponent({
    name: "TabSelector",
    props: {
        label: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    emits: {
        "tabSelected": (index: number) => true
    },
    setup(props, ctx) {
        const activeClass = computed(() => props.active ? "text-gray-900" : "text-gray-500");
        return () => <button class={activeClass.value} onClick={() => ctx.emit("tabSelected", props.index)}>{props.label}</button>;
    }
});

export const Tabs = defineComponent({
    name: "Tabs",
    setup(props, ctx) {
        if(!ctx.slots.default) {
            return () => <p>No tabs found.</p>;
        };

        const labels: string[] = ctx.slots.default().map((tab) => {
            return tab.props!.label;
        })

        const activeTab = ref(0);

        return () => <div>
            <div class="flex gap-2">
                {labels.map((label, index) => {
                    return <TabSelector label={label} index={index} active={index === activeTab.value}
                        onTabSelected={(index) => { activeTab.value = index }} />
                })}
            </div>
            <div>
                {ctx.slots.default!()[activeTab.value]}
            </div>
        </div>;
    }
});

export const VerticalTabs = defineComponent({

})