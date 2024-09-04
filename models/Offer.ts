import { model, models, Schema } from "mongoose";

const OfferSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
});
const Offer = models?.Offer || model("Offer", OfferSchema);
export default Offer;
