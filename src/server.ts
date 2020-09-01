import app from './app'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Exchange Rate app listening on port ${PORT}!`))
