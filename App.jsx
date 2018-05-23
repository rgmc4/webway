import React from 'react';

class App extends React.Component {
    constructor() {
        super();
            this.state = {
            collection: [],
            deck: [],
        }
    }

    componentDidMount() {
        let targetUrl = "http://127.0.0.1:5000/cards";
        fetch(targetUrl, {
            method: "GET",
            headers: {"Content-Type":"application/json"},
            body: {
                "Name": "Captain Cato Sicarius"
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ collection: data }));
        //fetch("../CardJSON/deck001.json")
            //.then(response => response.json())
            //.then(data => this.setState({ deck: data }));
    }

    addCard(card, mode) {
        let index = this.getCardIndex(card);
        let tempDeck = this.state.deck;

        if (index > -1) {
            let currCount = tempDeck[index].DeckCount;

            tempDeck[index].DeckCount = (mode == "add" ? currCount + 1 : currCount - 1);
            if (tempDeck[index].DeckCount < 1) {
                tempDeck.splice(index, 1);
            }
            this.setState({deck: tempDeck});
            //this.setState({deck: update(this.state.deck, {index: {Name: {$set: 'BAM'}}})});
        }
        else if (mode == "add") {
            let newCard = {
                "Card": card,
                "DeckCount": 1
            };
            this.setState({deck: this.state.deck.concat([newCard])});
            //this.setState({deck: update(this.state.deck.concat([card]))});
        }
    }

    getCardIndex(card) {
        return this.state.deck.findIndex(item => card.Name === item.Card.Name);
    }

    render() {
        this.addCard = this.addCard.bind(this);
        return (
            <div className="row">
                <div className="col-md-3">
                    <Deck deckItems={this.state.deck} />
                </div>
                <div className="col-md-9">
                    <Collection collectionItems={this.state.collection} changeQuantity={this.addCard} />
                </div>
            </div>
        );
    }
}

class Deck extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">Deck</div>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-8"><label>Name</label></div>
                        <div className="col-md-4"><label className="pull-right">Quantity</label></div>
                    </div>
                    {this.props.deckItems.map(item => <DeckItem key={item.Card.Name} data={item} />)}
                </div>
            </div>
        );
    }
}

class DeckItem extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-8">{this.props.data.Card.Name}</div>
                <div className="col-md-4"><span className="pull-right">{this.props.data.DeckCount}</span></div>
            </div>
        );
    }
}

class Collection extends React.Component {
    constructor() {
        super();
            this.state = {
            filter: {},
        }
    }

    filter(e) {
        this.setState({filter: {"Name": e.target.value}});
    }

    render() {
        let items = this.props.collectionItems;

        if (this.state.filter.Name) {
            items = items.filter(item => item.Name.toLowerCase().includes(this.state.filter.Name.toLowerCase()));
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">
                        Deck
                        <div className="pull-right"><input type="text" placeholder="Filter Results" className="form-control" onChange={this.filter.bind(this)} /></div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-4"><label>Name</label></div>
                        <div className="col-md-2"><label>Type</label></div>
                        <div className="col-md-1"><label>Cost</label></div>
                    </div>
                    {items.map(item => <CollectionItem key={item.Name} data={item} changeQuantity={this.props.changeQuantity} />)}
                </div>
            </div>
        );
    }
}

class CollectionItem extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-1">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true" onClick={() => {this.props.changeQuantity(this.props.data, "add")}}></span>
                    <span className="glyphicon glyphicon-minus" aria-hidden="true" onClick={() => {this.props.changeQuantity(this.props.data, "sub")}}></span>
                </div>
                <div className="col-md-4">{this.props.data.Name}</div>
                <div className="col-md-2">{this.props.data.Type}</div>
                <div className="col-md-1">{this.props.data.Cost}</div>
            </div>
        );
    }
}

// class CardDetails extends React.Component {
//     render() {
//         if (this.props.data.Type == "Army") {
//             return (
//                 <div className="col-md-4">
//                     <div className="panel panel-default">
//                         <div className="panel-heading">
//                             <div className="panel-title">{this.props.data.Name}</div>
//                         </div>
//                         <div className="panel-body">
//                             <label>Type:</label> <span>{this.props.data.Type}</span><br />
//                             <label>Faction:</label> <span>{this.props.data.Faction}</span><br />
//                             <label>Traits:</label> <span>{this.props.data.Traits.join(", ")}</span><br />
//                             <label>Cost:</label> <span>{this.props.data.Cost}</span><br />
//                             <label>Loyalty:</label> <span>{this.props.data.Loyalty}</span><br />
//                             <label>Unique:</label> <span>{this.props.data.Unique == true ? "Yes" : "No"}</span><br />
//                             <br />
//                             <label>Command:</label> <span>{this.props.data.Command}</span><br />
//                             <label>Hit Points:</label> <span>{this.props.data.Health}</span><br />
//                             <label>Attack:</label> <span>{this.props.data.Attack}</span><br />
//                             <label>Keywords:</label> <span>{this.props.data.Keywords.join(", ")}</span><br />
//                             <br />
//                             {this.props.data.Text}
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//         else {
//             return (
//                 ""
//             );
//         }
//    }
// }
export default App;