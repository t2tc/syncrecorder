import { defineComponent } from 'vue';

export default defineComponent({
    setup(props, ctx) {
        return () => {
            return (
                <dialog>
                    <div class="dialog__content">
                        <div class="dialog__header">
                            <div class="dialog__title">
                                <slot name="title"></slot>
                            </div>
                            <div class="dialog__close">
                                <slot name="close"></slot>
                            </div>
                        </div>
                        <div class="dialog__body">
                            <slot name="body"></slot>
                        </div>
                        <div class="dialog__footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </dialog>
            );
        }
    },
});