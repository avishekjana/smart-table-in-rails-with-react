import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

const headCells = [
  { id: 'id', label: '#ID', isSortable: true },
  { id: 'name', label: 'Name', isSortable: true },
  { id: 'price', label: 'Price', isSortable: true },
  { id: 'is_active', label: 'Active?', isSortable: false },
  { id: 'updated_at', label: 'Last Updated', isSortable: true },
  { id: 'created_at', label: 'Created On', isSortable: true },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={`${headCell.id}-${index}`}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.isSortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
                headCell.label
              )}

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const SmartTable = props => {
  const { products, productMeta, handleSorting, handlePageNumberClick } = props;
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created_at');

  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    handleSorting(property, isAsc ? 'desc' : 'asc');
  };

  const pageCount = Math.ceil(productMeta.total_count / productMeta.per);

  const handlePageClick = data => {
    let selected = data.selected;
    handlePageNumberClick(selected + 1);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSortRequest}
            />
            <TableBody>
              {products.map(product => {
                return (
                  <TableRow
                    hover
                    key={product.id}
                  >
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {product.is_active ? (
                          <span>Active</span>
                        ): (
                          <span>Inactive</span>
                        )
                      }
                    </TableCell>
                    <TableCell>{product.updated_at}</TableCell>
                    <TableCell>{product.created_at}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination page-numbering'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        <span className='paginationTotalCount'>Total {productMeta.total_count}</span>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

export default SmartTable;
