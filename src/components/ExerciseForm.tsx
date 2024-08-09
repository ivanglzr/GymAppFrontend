import "@/css/Forms.css";

import { poppins } from "@/css/fonts";

export default function ExerciseForm({
  isEditExercise,
}: {
  isEditExercise: boolean;
}) {
  return (
    <form id="form">
      <h1>{isEditExercise ? "Edit Exercise" : "Create Exercise"}</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className={poppins.className}
        ></textarea>
      </div>
    </form>
  );
}
