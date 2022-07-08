import Normalizer from "../services/normalizer";
import StructureType from "./StructureType";
import AbsStructure from "./IABSStructure";

const structure = Normalizer.SchemaEntity("structure", {
  structureType: StructureType
}, { idAttribute: "id" });

structure.define({
  orgStructure: structure,
  children: [structure],
  absStructure: AbsStructure,
  structureParentHierarchy: structure,
});

export default structure;
