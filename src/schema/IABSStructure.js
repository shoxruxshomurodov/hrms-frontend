import Normalizer from "../services/normalizer";
import Structure from "./Structure";

const iabsStructure = Normalizer.SchemaEntity("IABSStructure", {
}, { idAttribute: "id" });

iabsStructure.define({
    children: [iabsStructure],
    parentStructure: Structure
});

export default iabsStructure;
