import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hello! I'm your Secure Bank AI Assistant. How can I help you today?"
        }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();

        const userMessage = message.trim();

        if (!userMessage || loading) return;

        // Display user's message immediately
        setMessages((prev) => [
            ...prev,
            {
                from: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/Chat/chat`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: userMessage
        })
    }
);

            if (!response.ok) {
                throw new Error("Failed to get response from AI assistant.");
            }

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: data.response
                }
            ]);
        } catch (error) {
            console.error("Chat error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: "Sorry, I'm unable to connect to the AI assistant right now. Please try again."
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="page-heading">
                <div>
                    <span className="eyebrow">SMART BANKING</span>
                    <h2>AI Assistant</h2>
                    <p>
                        Get help with banking services and your account.
                    </p>
                </div>
            </div>

            <div className="chat-layout">

                <aside className="panel assistant-info">
                    <div className="ai-mark">✦</div>

                    <h3>Secure Bank AI</h3>

                    <p>
                        Your digital banking companion for quick answers
                        and guidance.
                    </p>

                    <div className="suggestions">

                        <button
                            onClick={() =>
                                setMessage("How can I transfer money?")
                            }
                        >
                            How can I transfer money?
                        </button>

                        <button
                            onClick={() =>
                                setMessage("How do I check transactions?")
                            }
                        >
                            How do I check transactions?
                        </button>

                        <button
                            onClick={() =>
                                setMessage("How do I stay safe online?")
                            }
                        >
                            How do I stay safe online?
                        </button>

                    </div>
                </aside>

                <section className="panel chat-window">

                    <div className="chat-header">

                        <div className="ai-avatar">
                            ✦
                        </div>

                        <div>
                            <strong>
                                Secure Bank Assistant
                            </strong>

                            <span>
                                {loading
                                    ? "Thinking..."
                                    : "Online • Ready to help"}
                            </span>
                        </div>

                    </div>

                    <div className="chat-messages">

                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={`chat-message ${item.from}`}
                            >
                                {item.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="chat-message bot">
                                Thinking...
                            </div>
                        )}

                    </div>

                    <form
                        className="chat-input"
                        onSubmit={sendMessage}
                    >

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Ask something about your banking..."
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            disabled={loading || !message.trim()}
                        >
                            →
                        </button>

                    </form>

                </section>

            </div>
        </MainLayout>
    );
}

export default Chatbot;
