
const HomeTutor = ({user}) => {
    return (
        <div>
        <h2 className="text-2xl font-bold mb-4">Tutor</h2>
        <p>This is your dashboard, {user?.username || "guest"}!</p>
      </div>
    );
}

export default HomeTutor;