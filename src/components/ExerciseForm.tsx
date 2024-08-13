"use client";

import "@/css/Forms.css";

import { poppins } from "@/css/fonts";

import {
  muscularGroups,
  exerciseEquipments,
  UserExercise,
  ExerciseEquipments,
  MuscularGroups,
  BackendResponse,
} from "../index.d";

import { validateExerciseForm } from "@/utils/validateForm";

import { postExercise, putExercise, uploadImage } from "@/services/exercise";
import { useCallback, useState } from "react";

export default function ExerciseForm({
  isEditExercise,
  exercise = {
    name: "",
    description: "",
    muscle: "Abductors",
    equipment: "Barbell",
  },
  exerciseId = "",
}: {
  isEditExercise: boolean;
  exercise?: UserExercise;
  exerciseId?: string;
}) {
  const [image, setImage] = useState<File | undefined>(undefined);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      const equipment = data.equipment as ExerciseEquipments;
      const muscle = data.muscle as MuscularGroups;

      // Validación de equipamiento y grupo muscular
      if (
        !exerciseEquipments.includes(equipment) ||
        !muscularGroups.includes(muscle)
      ) {
        alert("Not valid");
        return;
      }

      const exerciseData: UserExercise = {
        name: data.name as string,
        description: data.description as string,
        equipment,
        muscle,
      };

      // Validación del formulario
      const validationError = validateExerciseForm(exerciseData);
      if (validationError) {
        alert(validationError);
        return;
      }

      try {
        // Envío del ejercicio
        const res = isEditExercise
          ? await putExercise(exerciseId, exerciseData)
          : await postExercise(exerciseData);

        if (res.status === "error") throw new Error(res.message);

        // Subida de imagen si está presente
        if (image) {
          const imageFormData = new FormData();
          imageFormData.append("file0", image);

          const imageRes = await uploadImage(exerciseId, imageFormData);
          if (imageRes.status === "error") throw new Error(imageRes.message);

          alert(imageRes.message);
        } else {
          alert(
            `Exercise ${isEditExercise ? "edited" : "created"} successfully`
          );
        }
      } catch (err) {
        alert(err);
      }
    },
    [exerciseId, image, isEditExercise]
  );

  const handleImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.currentTarget.files?.length) {
        alert("There isn't a file");
        return;
      }

      const file = event.currentTarget.files[0];

      // Validación del tipo de archivo
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Type isn't valid");
        return;
      }

      setImage(file);
    },
    [setImage]
  );

  return (
    <form id="form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <h1>{isEditExercise ? "Edit Exercise" : "Create Exercise"}</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" defaultValue={exercise.name} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className={poppins.className}
          defaultValue={exercise.description}
        ></textarea>
      </div>
      <div className="form-group-selects">
        <div className="select-group">
          <label htmlFor="muscle">Muscle</label>
          <select name="muscle" id="muscle" defaultValue={exercise.muscle}>
            {muscularGroups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="select-group">
          <label htmlFor="equipment">Equipment</label>
          <select
            name="equipment"
            id="equipment"
            defaultValue={exercise.equipment}
          >
            {exerciseEquipments.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={event => handleImage(event)}
        />
      </div>

      <button type="submit" id="btn-submit">
        Submit
      </button>
    </form>
  );
}
