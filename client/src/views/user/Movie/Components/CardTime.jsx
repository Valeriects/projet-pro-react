import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formattedTime } from "../../../../utils/formatDate.js";

function CardTime({ item }) {
    
    return (
        <>
            <ul className="horaire">
                {item.timeTables.map((timeTable) => (
                    <li key={timeTable.id}>
                        <Link to={`/film/${item.id}/seance/${timeTable.id}`}>
                            {formattedTime(timeTable.horaire)}
                        </Link>
                    </li>
                    ))}
            </ul>
        </>
    );

}

CardTime.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        timeTables: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
};

export default CardTime;