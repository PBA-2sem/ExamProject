import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '70vh',
    },
});

export default function StickyHeadTable({ products, addToCart }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Make</TableCell>
                            <TableCell align="right">Model</TableCell>
                            <TableCell align="right">Color</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">  </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>
                            <TableRow hover tabIndex={-1} key={row.productId}>
                                <TableCell component="th" scope="row">
                                    {row.make}
                                </TableCell>
                                <TableCell align="right">{row.model}</TableCell>
                                <TableCell style={{ backgroundColor: row.color }} align="right">{row.color}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={(e) => addToCart(e, row)} size="small" color="primary" aria-label="add to shopping cart">
                                        <AddShoppingCartIcon fontSize="inherit" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 100, 250]}
                component="div"
                count={products ? products.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

