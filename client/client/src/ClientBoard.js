import React, { Component } from 'react';
import ClientBoardRoom from "./ClientBoardRoom";
import ClientBoardHallway from "./ClientBoardHallway";
import './App.css';
class ClientBoard extends Component {
    render() {
        return (
            <table className="Board" border-collapse="collapse" cellPadding={"0"} cellSpacing={"0"}>
                <tbody>
                    <tr className="BoardRow">
                        <ClientBoardRoom id={0} type={"room"}/>
                        <ClientBoardHallway id={1}/>
                        <ClientBoardRoom id={2} type={"room"}/>
                        <ClientBoardHallway id={3}/>
                        <ClientBoardRoom id={4} type={"room"}/>
                    </tr>
                    <tr className="BoardRow">
                        <ClientBoardHallway id={5} orientation={"vertical"}/>
                        <ClientBoardRoom id={6} type={"spacer"}/>
                        <ClientBoardHallway id={7} orientation={"vertical"}/>
                        <ClientBoardRoom id={8} type={"spacer"}/>
                        <ClientBoardHallway id={9} orientation={"vertical"}/>
                    </tr>
                    <tr className="BoardRow">
                        <ClientBoardRoom id={10} type={"room"}/>
                        <ClientBoardHallway id={11}/>
                        <ClientBoardRoom id={12} type={"room"}/>
                        <ClientBoardHallway id={13}/>
                        <ClientBoardRoom id={14} type={"room"}/>
                    </tr>
                    <tr className="BoardRow">
                        <ClientBoardHallway id={15} orientation={"vertical"}/>
                        <ClientBoardRoom id={16} type={"spacer"}/>
                        <ClientBoardHallway id={17} orientation={"vertical"}/>
                        <ClientBoardRoom id={18} type={"spacer"}/>
                        <ClientBoardHallway id={19} orientation={"vertical"}/>
                    </tr>
                    <tr className="BoardRow">
                        <ClientBoardRoom id={20} type={"room"}/>
                        <ClientBoardHallway id={21}/>
                        <ClientBoardRoom id={22} type={"room"}/>
                        <ClientBoardHallway id={23}/>
                        <ClientBoardRoom id={24} type={"room"}/>
                    </tr>
                </tbody>
            </table>
        );
    }
}
export default ClientBoard;