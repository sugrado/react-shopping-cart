import {
  Badge,
  BadgeProps,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { Link } from "react-router-dom";

export default function CartSummary(props: any) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Shopping Cart">
        <IconButton aria-label="cart" onClick={handleOpenUserMenu}>
          <StyledBadge badgeContent={props.cart.length} color="success">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {props.cart.length > 0 ? (
          props.cart.map((c) => (
            <MenuItem key={c.product.id}>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-danger me-2"
                  onClick={() => {
                    props.removeFromCart(c.product);
                  }}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <Typography textAlign="center">
                  {c.product.productName}
                </Typography>
                <Badge
                  className="ms-3"
                  badgeContent={c.quantity}
                  color="success"
                ></Badge>
              </div>
            </MenuItem>
          ))
        ) : (
          <p className="pb-0 mb-0 ms-2 me-2">Your cart is Empty</p>
        )}
        <Divider />
        <MenuItem>
          <Link to="cart">
            <Button variant="contained">GO TO CART</Button>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}
