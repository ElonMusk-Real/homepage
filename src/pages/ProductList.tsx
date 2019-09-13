import React from "react"
import { makeStyles, Grid, Button, Card } from "@material-ui/core"

const useStyles = makeStyles({
    container: {
        backgroundColor: '#F8EAEA',
        minHeight: '100vh',
        paddingTop: 64
    },
    debug: {
        border: '1px solid black',
    },
    text: {
        padding: 48
    },
    testCard: {
        width: "200px",
        height: "200px",
        margin: '5px 5px 5px 5px',
    },

})

interface Props {

}

export const TestCard: React.FC<Props> = () => {
    const classes = useStyles()
    return (
        <Card className={classes.testCard}>
            HAI
        </Card>
    )
}


const ProductList: React.FC<Props> = () => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        category: '',
        maxPrice: 0,
        searchQuery: '',
    })
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];



    return (
        <div className={classes.container}>
            <Grid container justify="center">
                <Grid item>
                    <Button variant="contained" color="primary" >Search</Button>
                </Grid>
                <Grid container direction="row" justify="center">
                    {list.map((value, index) => {
                        return (
                            <Grid item>
                                <TestCard />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

        </div>
    )
}
export default ProductList