import { createAsyncThunk } from "@reduxjs/toolkit";
import { LIST_CATEOGORY } from "./cateogory.type";
import { listCateogoryService } from "@/services/catoegory.service";


export const listCateogory = createAsyncThunk(LIST_CATEOGORY, async () => {
    const res = await listCateogoryService();
    const data = res.data;
    console.log("res data", data);
    return data;
  });