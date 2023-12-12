import PropTypes from "prop-types";
import "./DataViewerScreen.css";
const DataViewerScreen = ({data, onReset}) => {
    // redifined in ТЗ
    const redifinedHeader = {
        "name": "Имя",
        "phone": "Номер телефона",
        "bday": "Дата рождения",
        "address": "Адрес"
    }

    // return <thead>. if the velue of <th> was redifined in the ТЗ , use it
    const renderTableHeader = () => (
        <tr>
            {data[0].map((value, key) => (
                <th key={key}>
                    {redifinedHeader[value] ? redifinedHeader[value] : value}
                </th>
            ))}
        </tr>
    );
    const renderTableBody = () => {
        return (
            <>
            {data.slice(1).map((item, index) => (
                <tr key={index}>
                    {Object.keys(item).map((field, idx) => (
                        <td key={idx}>
                            {item[field]}
                        </td>
                    ))}
                </tr>
            ))}
            </>
        );
    };


    return (
        <div className="app-viewer">
            <button className="app-viewer__btn main-btn" onClick={onReset}>Загрузить новый файл</button>
            <table className="app-viewer__table">
                {renderTableHeader()}
                {renderTableBody()}
            </table>
        </div>
    );

}

DataViewerScreen.propTypes = {
    data: PropTypes.array,
    onReset: PropTypes.func.isRequired,
};
DataViewerScreen.defaultProps = {
    data: null,
    onReset: () => {
        console.error("onReset not passed");
    },
}
export default DataViewerScreen;