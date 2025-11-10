import React, { useEffect, useState, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const MyHabits = () => {
  const { user, loading: authLoading } = useAuth();
  const [myHabits, setMyHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const fetchHabits = useCallback(() => {
    if (authLoading || !user) return;
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

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/habits/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your habit has been deleted.", "success");

              setMyHabits(myHabits.filter((habit) => habit._id !== id));
            }
          });
      }
    });
  };

  const openUpdateModal = (habit) => {
    setSelectedHabit(habit);
    setValue("title", habit.title);
    setValue("description", habit.description);
    setValue("category", habit.category);
    setValue("reminderTime", habit.reminderTime);
    setValue("image", habit.image);
    setIsModalOpen(true);
  };

  const onUpdateSubmit = (data) => {
    fetch(`http://localhost:5000/habits/${selectedHabit._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          toast.success("Habit updated successfully!");
          setIsModalOpen(false);
          fetchHabits();
        } else {
          toast.error("Failed to update habit or no changes made.");
        }
      })
      .catch((err) => toast.error(err.message));
  };

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
              <th>Streak</th>
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
                  <button
                    onClick={() => openUpdateModal(habit)}
                    className="btn btn-ghost btn-xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="btn btn-ghost btn-xs text-red-600"
                  >
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

      {isModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-2xl mb-4">
              Update Habit: {selectedHabit.title}
            </h3>

            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="Morning">Morning</option>
                  <option value="Work">Work</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Evening">Evening</option>
                  <option value="Study">Study</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered h-24"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reminder Time</span>
                  </label>
                  <input
                    type="time"
                    {...register("reminderTime")}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="text"
                    {...register("image")}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="modal-action mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyHabits;
