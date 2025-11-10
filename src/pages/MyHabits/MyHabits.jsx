import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyHabits = () => {
  const { user, loading: authLoading } = useAuth();
  const [myHabits, setMyHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) {
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/habits/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyHabits(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user habits:", error);
        setLoading(false);
      });
  }, [user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (myHabits.length === 0) {
    return (
      <div className="text-center my-20">
        <h1 className="text-3xl font-bold mb-4">
          You haven't added any habits yet.
        </h1>
        <Link to="/add-habit" className="btn btn-primary">
          Add Your First Habit
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 my-10">
      <h1 className="text-4xl font-bold text-center mb-10">My Habits</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Current Streak</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myHabits.map((habit, index) => (
              <tr key={habit._id} className="hover">
                <th>{index + 1}</th>
                <td>{habit.title}</td>
                <td>{habit.category}</td>
                <td>
                  <span className="badge badge-primary badge-lg">0 days</span>
                </td>
                <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">Update</button>
                  <button className="btn btn-ghost btn-xs text-red-600">
                    Delete
                  </button>
                  <button className="btn btn-primary btn-xs ml-2">
                    Mark Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHabits;
