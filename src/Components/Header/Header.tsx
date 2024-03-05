import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { StyleSheet } from '../ProductsList/Product'
import Icon from '../../Assets/flipkart-plus_8d85f4.png'
import subIcon from '../../Assets/plus_aef861.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Products/context';


const Header = () => {
    const navigate = useNavigate();
    const context = useContext(Context)
    return (
        <Box sx={StyleSheet.Header}>
            <Box sx={{ mt: '10px' }} onClick={() => navigate("/")}>
                <Box component={'img'} src={Icon}
                    sx={StyleSheet.flipkartIcon} />

                <Box sx={StyleSheet.exploreTxt}>
                    <Box component={'p'}> Explore</Box> <Box component={'p'} sx={StyleSheet.Plus} >Plus</Box>
                    <Box component={'img'} src={subIcon} sx={StyleSheet.flower} />
                </Box>


            </Box>

            <Box sx={StyleSheet.Cart}
                onClick={() => navigate("/Cart")}
            >

                <ShoppingCartIcon /> <Box component={'span'}> Cart ({context?.cartList.length})</Box>
            </Box>

        </Box>
    )
}

export default Header
