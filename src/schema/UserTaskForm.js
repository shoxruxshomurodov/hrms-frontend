import Normalizer from "../services/normalizer";
import FieldScheme from "./Field";
import FormScheme from "./FormScheme";

export default Normalizer.SchemaEntity("userTaskForm",{
    fields:[FieldScheme],
    form:FormScheme
},{idAttribute:"id"});
