const Loading = ({ message = 'Loading...' }) => {
    return (
        <div
            style={{
                padding: 20,
                textAlign: 'center'
            }}
        >
            <h2>{message}</h2>
        </div>
    );
};

export default Loading;