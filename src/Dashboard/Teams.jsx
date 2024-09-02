const Teams = () => {
  const teams = [
    "Development",
    "Marketing",
    "Accounting",
    "Human Resources",
    "Retails",
  ];

  return (
    <div className="teams">
      <div className="teams-title">Teams</div>
      <div className="teams-list">
        {teams.map((team, index) => (
          <div className="team" key={index}>
            <i className="fa-solid fa-caret-right"></i> {team}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
