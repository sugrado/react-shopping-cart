import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Category } from "./models/category";
import CategoryService from "./services/CategoryService";

export default function CategoryList(props: any) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let categoryService: CategoryService = new CategoryService();
    categoryService
      .getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((errorResponse) => alert(errorResponse));
  }, []);

  return (
    <>
      <h3>{props.info.title}</h3>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          {categories.map((p) => (
            <ListItemButton
              key={p.id}
              selected={props.info.currentCategory.id === p.id}
              onClick={() => props.changeCategory(p)}
            >
              <ListItemText primary={p.categoryName} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
}
