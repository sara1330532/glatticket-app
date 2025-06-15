import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetTicketById } from "../api/ticketService";
import "../style/TicketDetails.scss";

//==============================================================
// TicketDetails component - shows details of a single ticket
//==============================================================

const TicketDetails = () => {
    let navigate = useNavigate();
    let id = useParams().id;
    let [ticket, setTicket] = useState(null);

    useEffect(() => {
        apiGetTicketById(id)
            .then(res => setTicket(res.data))
            .catch(err => console.log(err.message));
    }, [id]);

    return (
        <div className="details-overlay">
            <div className="details-modal">
                <button 
                className="close-btn" onClick={() => navigate(-1)}>x</button>
                {ticket && (
                    <div className="details-content">
                        <img src={ticket.Image} alt={ticket.name} />
                        <h2>{ticket.name}</h2>
                        <p>{ticket.description}</p>
                        <h3>{ticket.date} | {ticket.dayOnweek} | {ticket.hour}</h3>
                        <h3>מחיר: ₪{ticket.cost}</h3>
                        <h4>{ticket.address}, {ticket.city}</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetails;
