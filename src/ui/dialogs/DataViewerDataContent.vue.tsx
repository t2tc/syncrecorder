import { defineComponent, effect, onMounted, ref } from 'vue';
import { useDocument } from '../../use/document/useDocument';
import { clearTarget, green, println, put, red, setTarget } from '../../formatted_output';

export default defineComponent({
    name: "DataViewerDataContent",
    setup(props) {
        const document = useDocument();
        const metadata = document.metadata.value;
        const tracks = document.tracks.value;
        const div = ref();

        onMounted(() => {
            setTarget(div.value);

            effect(() => {
                clearTarget(div.value);
                Object.entries(metadata!).forEach(([key, value]) => {
                    red(key);
                    put(`: ${value}`);
                    println();
                });
                println('Tracks:');
                tracks.forEach((content, index) => {
                    red("track number #" + index + ' ');
                    green(`name: ${content.name}`);
                    println();
                    Object.entries(content.settings).forEach(([key, value]) => {
                        red(key);
                        put(`: ${value}`);
                        println();
                    });
                })
            })
        });

        return () => {
            return <div>
                <div ref={div} class="text-sm select-text overflow-y-scroll w-full h-[300px] bg-white monospace">
                </div>
                <button class=" m-1 p-1 border-slate-500 border rounded-sm text-xs">Refresh</button>
            </div>;
        }
    }
});