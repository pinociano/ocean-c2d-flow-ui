import { History, createBrowserHistory } from "history"

const history: History = createBrowserHistory()

history.listen((location, action) => {
    console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
    )
    console.log(`The last navigation action was ${action}`)
})
export default history
