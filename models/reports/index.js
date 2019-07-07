import { model } from "mongoose";
import reportSchema from './schema';

const Reports = model('reports', reportSchema);

export default Reports;
