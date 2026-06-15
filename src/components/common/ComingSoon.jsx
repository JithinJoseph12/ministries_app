import { Rocket } from "lucide-react";

export default function ComingSoon({ title, description }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-8">
            <div 
                className="flex flex-col items-center text-center max-w-md p-10 rounded-3xl"
                style={{ 
                    backgroundColor: "#ffffff", 
                    border: "1px solid #e8edf5",
                    boxShadow: "0 10px 40px -10px rgba(30, 58, 138, 0.08)"
                }}
            >
                <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "#eef3fb" }}
                >
                    <Rocket size={40} style={{ color: "#1e3a8a" }} />
                </div>
                
                <h1 
                    style={{ 
                        fontFamily: "'Playfair Display', serif", 
                        fontSize: "32px", 
                        fontWeight: 700, 
                        color: "#1e3a8a", 
                        marginBottom: "12px",
                        lineHeight: "1.2"
                    }}
                >
                    {title} Coming Soon
                </h1>
                
                <p 
                    style={{ 
                        color: "#6b7a99", 
                        fontSize: "16px", 
                        lineHeight: "1.6",
                        fontFamily: "'Inter', sans-serif"
                    }}
                >
                    {description || "We are working hard to bring you this feature. Stay tuned for updates!"}
                </p>
                
                <div className="mt-8">
                    <div 
                        style={{ 
                            width: "60px", 
                            height: "4px", 
                            backgroundColor: "#c9a553", 
                            borderRadius: "2px",
                            margin: "0 auto"
                        }} 
                    />
                </div>
            </div>
        </div>
    );
}
