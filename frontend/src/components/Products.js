import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Products extends Component {

    render() {
        return (
            <div style={{ display: 'flex' }} >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Make</TableCell>
                                <TableCell align="right">Model</TableCell>
                                <TableCell align="right">Color</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right"> :) </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.products && this.props.products.map((row, i) =>
                                <TableRow key={row.make + i}>
                                    <TableCell component="th" scope="row">
                                        {row.make}
                                    </TableCell>
                                    <TableCell align="right">{row.model}</TableCell>
                                    <TableCell style={{ backgroundColor: row.color }} align="right">{row.color}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell onClick={() => alert(row.make)} align="right">BUY ME</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

