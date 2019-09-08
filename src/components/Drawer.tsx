import React from 'react'
import { Drawer as DrawerMUI, List, ListItem, ListItemIcon, ListItemText, Icon, makeStyles } from '@material-ui/core'
interface DrawerProps {
  open: boolean
  toggle: () => void
}

const menus = [
  {icon: 'home', text: 'Home'},
  {icon: 'home', text: 'Order'},
  {icon: 'home', text: 'Filter Snack'},
  {icon: 'home', text: 'Merchant'},
  {icon: 'home', text: 'About'},
  {icon: 'home', text: 'Login'},
]

const useStyles = makeStyles({
  list: {
    width: 250
  }
})

const Drawer: React.FC<DrawerProps> = props => {
  const classes = useStyles()
  const ListMenu = (props: any) => {
    return (
      <div className={classes.list}>
        <List>
          <ListItem>
            <ListItemIcon><Icon>{props.icon}</Icon></ListItemIcon>
            <ListItemText primary={props.text} />
          </ListItem>
        </List>
      </div>
    )
  }

  return (
    <div>
      <DrawerMUI anchor='right' open={props.open} onClose={props.toggle}>
        {menus.map(menu => {
          return (
            <ListMenu icon={menu.icon} text={menu.text}/>
          )
        })}
      </DrawerMUI>
    </div>
  )
}

export default Drawer