import { defineComponent } from "vue";

export type ControlPanelToggle = { type: 'toggle', label: string, defaultValue: boolean, onChange: (value: boolean) => void };
export type ControlPanelSlider = { type: 'slider', label: string, defaultValue: number, min: number, max: number, onChange: (value: number) => void };
export type ControlPanelColor = { type: 'color', label: string, defaultValue: string, onChange: (value: string) => void };
export type ControlPanelSelect = { type: 'select', label: string, defaultValue: string, options: string[], onChange: (value: string) => void };
export type ControlPanelButton = { type: 'button', label: string, onClick: () => void };
export type ControlPanelInput = { type: 'input', label: string, defaultValue: string, onChange: (value: string) => void };
export type ControlPanelNumberInput = { type: 'numinput', label: string, defaultValue: number, unit: string, onChange: (value: number) => void };
export type ControlPanelGroup = { type: 'group', label: string, items: ControlPanelItem[] };

type ControlPanelItem = ControlPanelToggle | ControlPanelSlider | ControlPanelColor | ControlPanelSelect | ControlPanelButton | ControlPanelGroup | ControlPanelInput | ControlPanelNumberInput;
type ControlPanelContent = { items: ControlPanelItem[] };

const isToggle = (item: ControlPanelItem): item is ControlPanelToggle => { return item.type === 'toggle' };
const isSlider = (item: ControlPanelItem): item is ControlPanelSlider => { return item.type === 'slider' };
const isColor = (item: ControlPanelItem): item is ControlPanelColor => { return item.type === 'color' };
const isSelect = (item: ControlPanelItem): item is ControlPanelSelect => { return item.type === 'select' };
const isButton = (item: ControlPanelItem): item is ControlPanelButton => { return item.type === 'button' };
const isGroup = (item: ControlPanelItem): item is ControlPanelGroup => { return item.type === 'group' };
const isInput = (item: ControlPanelItem): item is ControlPanelInput => { return item.type === 'input' };
const isNumberInput = (item: ControlPanelItem): item is ControlPanelNumberInput => { return item.type === 'numinput' };

const Switch = defineComponent({
    name: "Switch",
    props: {
        item: {
            type: Object as () => ControlPanelToggle,
            required: true
        }
    },
    render() {
        const item = this.$props.item;
        return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
            {item.label}
            <input type='checkbox' checked={item.defaultValue} onChange={(e) => item.onChange(e.target.checked)}></input>
        </div>
    }
});

const ControlPanel = defineComponent({
    name: "ControlPanel",
    props: {
        content: {
            type: Object as () => ControlPanelContent,
            required: true
        }
    },
    render() {
        const content = this.$props.content;
        return <div class='flex flex-col w-full h-full'>
            {content.items.map(item => {
                if (item.type === 'group') {
                    return <div class='flex flex-col w-full h-full'>
                        <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                            {item.label}
                        </div>
                        <div class='flex flex-col w-full h-full p-2 bg-neutral-300'>
                            <ControlPanel content={{ items: item.items }}></ControlPanel>
                        </div>
                    </div>
                } else if (item.type === 'toggle') {
                    return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                        {item.label}
                        <input type='checkbox' checked={item.defaultValue} onChange={(e) => item.onChange(e.target.checked)}></input>
                    </div>
                } else if (item.type === 'slider') {
                    return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                        {item.label}
                        <input type='range' min={item.min} max={item.max} value={item.defaultValue} onChange={(e) => item.onChange(e.target.valueAsNumber)}></input>
                    </div>
                } else if (item.type === 'color') {
                    return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                        {item.label}
                        <input type='color' value={item.defaultValue} onChange={(e) => item.onChange(e.target.value)}></input>
                    </div>
                } else if (item.type === 'select') {
                    return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                        {item.label}
                        <select value={item.defaultValue} onChange={(e) => item.onChange(e.target.value)}>
                            {item.options.map(option => <option value={option}>{option}</option>)}
                        </select>
                    </div>
                } else if (item.type === 'button') {
                    return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                        <button onClick={item.onClick}>{item.label}</button>
                    </div>
                } else if (item.type === 'input') {
                    return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                        {item.label}
                        <input type='text' value={item.defaultValue} onChange={(e) => item.onChange(e.target.value)}></input>
                    </div>
                } else if (item.type === 'numinput') {
                    return <div class='flex flex-row items-center justify-between w-full h-10 px-2 text-sm text-left text-white bg-neutral-400'>
                        {item.label}
                        <input type='number' value={item.defaultValue} onChange={(e) => item.onChange(e.target.valueAsNumber)}></input>
                        <span>{item.unit}</span>
                    </div>
                } else {
                    return <div></div>
                }
            }
            )}
        </div>
    }
})