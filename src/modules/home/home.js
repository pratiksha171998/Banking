import React,{Component} from 'react'
import  '../../resources/style/style.css'

export default class Home extends Component{
    render(){
        return(
            <div>
                 <div className="container">
                 <div className="card">
                <h1>Welcome to World Bank</h1>
                <div className = 'style'>
                <ul>
                    <li> 
                    The word bank comes from an Italian word banco, meaning a bench, since Italian merchants in the Renaissance made deals to borrow and lend money beside a bench. They placed the money on that bench.Elementary financial records are known from the beginning of history.
                    </li>
                    <li>
                    Baked clay records were done before the invention of writing.
                    </li>
                    <li>
                    In the 17th century, merchants started storing their gold with goldsmiths in London. The goldsmiths had their own vaults, and charged a fee for storing the merchants' gold. The goldsmiths eventually started loaning money using the gold left to them, and also paid interest on the gold.
                    </li>
                    <li>
                The Bank of England began issuing banknotes in 1695. The oldest bank still in existence is Monte dei Paschi di Siena in Siena, Italy, which started in 1472.
                </li>
                </ul>
                </div>
                </div>
                </div>
            </div>
        )
    }
}