import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { GraphChartVisualizationProps } from '../GraphChartVisualization';
import { getEntityHeader } from '../util/NodeUtils';
import { Dialog } from '@neo4j-ndl/react';
import {} from '@neo4j-ndl/react/icons';

export const formatProperty = (property) => {
  if (property.startsWith('http://') || property.startsWith('https://')) {
    return <a href={property}>{property}</a>;
  }
  return property;
};

export const NeoGraphChartInspectModal = (props: GraphChartVisualizationProps) => {
  return (
    <div>
      <Dialog
        size='large'
        open={props.interactivity.showPropertyInspector}
        onClose={() => props.interactivity.setPropertyInspectorOpen(false)}
        aria-labelledby='form-dialog-title'
      >
        <Dialog.Header id='form-dialog-title'>
          {props.interactivity.selectedEntity ? getEntityHeader(props.interactivity.selectedEntity) : ''}
        </Dialog.Header>
        <Dialog.Content>
          {props.interactivity.selectedEntity && (
            <TableContainer>
              <Table size='small'>
                <TableBody>
                  {Object.keys(props.interactivity.selectedEntity.properties).length == 0 ? (
                    <i>(No properties)</i>
                  ) : (
                    Object.keys(props.interactivity.selectedEntity.properties)
                      .sort()
                      .map((key) => (
                        <TableRow key={key}>
                          <TableCell component='th' scope='row'>
                            {key}
                          </TableCell>
                          <TableCell align={'left'}>
                            {formatProperty(
                              props.interactivity.selectedEntity &&
                                props.interactivity.selectedEntity.properties[key].toString()
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default NeoGraphChartInspectModal;