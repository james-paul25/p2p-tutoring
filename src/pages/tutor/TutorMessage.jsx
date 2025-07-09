
const TutorMessage = ({user}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-10 transition">
            <h2 className="text-2xl font-bold mb-4">Tutor</h2>
            <p>Message, {user?.username || "guest"}!</p>
      </div>
    );
}

export default TutorMessage;