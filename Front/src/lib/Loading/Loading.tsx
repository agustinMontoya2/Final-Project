const Loading = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="loader"></div>
            <p className="mt-4 text-black">Loading products...</p>
            <style jsx>{`
                .loader {
                    border: 8px solid #f3f3f3; /* Light gray */
                    border-top: 8px solid #3498db; /* Blue */
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export  default Loading;
