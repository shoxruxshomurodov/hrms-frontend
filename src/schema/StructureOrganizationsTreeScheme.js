import Normalizer from "../services/normalizer";
import District from "./District";
import Region from "./Region"

const structure = Normalizer.SchemaEntity("structure-tree", {
}, { idAttribute: "id" });

structure.define({
    orgStructure: structure,
    districtList: [{district:District,structures:[structure]}],
    region: Region,
    structures: [structure],
});

export default structure;
