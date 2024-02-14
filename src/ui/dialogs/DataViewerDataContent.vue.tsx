import { defineComponent } from 'vue';

export default defineComponent({
    name: "DataViewerDataContent",
    setup(props) {
        const tracks = useDocument().collection("tracks");

        return () => {
            return <div class="flex flex-col items-center justify-center">
                
            </div>;
        }
    }
});