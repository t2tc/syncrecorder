
import { nanoid } from "nanoid";

type ResourceType = "audio" | "automation" | "blob";

type Resource<T extends ResourceType> = {
    id: string;
    type: T;
    size: number,
    get data(): T;
}
