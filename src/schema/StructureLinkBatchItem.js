import Normalizer from "../services/normalizer";

const structureLinkBatchItem = Normalizer.SchemaEntity("StructureLinkBatchItem", {}, {idAttribute: "structureId"});

structureLinkBatchItem.define({
    children: [structureLinkBatchItem],
});

export default structureLinkBatchItem;
