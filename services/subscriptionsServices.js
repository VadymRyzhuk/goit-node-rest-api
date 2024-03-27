import Subscription from "../models/Subscription.js";

export const getAllSubscriptions = () => Subscription.find();

export const addSubscription = (data) => Subscription.create(data);
