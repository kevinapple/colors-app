import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import Button from '@material-ui/core/Button';
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      openResetDialog: false,
      deletingId: ""
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
    this.openResetDialog = this.openResetDialog.bind(this);
    this.closeResetDialog = this.closeResetDialog.bind(this);
  }
  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" });
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  openResetDialog(id) {
    this.setState({ openResetDialog: true });
  }
  handleReset(){
    this.props.resetPaletteList();
    this.closeResetDialog();
}
  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }
  closeResetDialog (){
    this.setState({ openResetDialog: false })
  }
  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog, openResetDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Kevin Colors</h1>
            <Button variant={"outlined"} className={classes.button} onClick={this.openResetDialog}>Reset</Button>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  {...palette}
                  goToPalette={this.goToPalette}
                  openDialog={this.openDialog}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialog}
        >
          <DialogTitle id='delete-dialog-title'>
            Delete This Palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
        <Dialog 
            open={openResetDialog} 
            aria-labelledby="reset-dialog-title"
            onClose={this.closeResetDialog}
        >
            <DialogTitle id="reset-dialog-title">Restore default Colors?</DialogTitle>
              <List>
                            <ListItem button onClick={this.handleReset}>
                                <ListItemAvatar>
                                    <Avatar
                                        style={{ backgroundColor:blue[100], color: blue[600] }}
                                    >
                                        <CheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Reset" />
                            </ListItem>
                            <ListItem button onClick={this.closeResetDialog}>
                                <ListItemAvatar>
                                    <Avatar
                                        style={{ backgroundColor:red[100], color: red[600] }}
                                    >
                                        <CloseIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Cancel" />
                            </ListItem>
                        </List>
                </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
