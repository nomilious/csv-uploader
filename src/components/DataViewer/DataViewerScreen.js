import PropTypes from "prop-types";
import "./DataViewerScreen.css";
import React from "react";

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
        <>
        <div className="table__row">
            {data[0].map((value, key) => (
                <div className="table__head" key={key}>
                    {redifinedHeader[value] ? redifinedHeader[value] : value}
                </div>
            ))}
        </div>
        </>
    );
    const renderTableBody = () => {
        return (
            <>
            {data.slice(1).map((item, index) => (
                <div className="table__row" key={index}>
                    {Object.keys(item).map((field, idx) => (
                        <div className="table__data" key={idx}>
                            {item[field]}
                        </div>
                    ))}
                </div>
            ))}
            </>
        );
    };


    return (
        <div className="app-viewer">
            <button className="app-viewer__btn main-btn" onClick={onReset}>Загрузить новый файл</button>
            <div className="app-viewer__table table">
                {renderTableHeader()}
                {renderTableBody()}
            </div>
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
        console.log("onReset not passed");
    },
}
export default React.memo(DataViewerScreen);