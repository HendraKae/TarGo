import * as SQLite from "expo-sqlite";


export const db = async () => {
  return await SQLite.openDatabaseAsync("targo.db");
}

export const initDatabase = async () => {
  const tx = await db();
  await tx.execAsync(
    `CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      isCompleted INTEGER DEFAULT 0
    );`
  );
};

export const addActivity = async (description, date, time) => {
  const tx = await db();
  try {
    await tx.runAsync(
      `INSERT INTO activities (description, date, time) VALUES (?, ?, ?);`,
      [description, date, time]
    );
    return { success: true };
  } catch (error) {
    return { success: false, error };
  } 
};

export const fetchActivities = async () => {
  const tx = await db();
  try {
    const allRows = await tx.getAllAsync('SELECT * FROM activities');

    return { success: true, data: allRows };
  } catch (error) {
    return { success: false, error };
  } finally {
    
  }
};

export const updateActivityStatus = async (id, isCompleted) => {
  const tx = await db();

  try {
    await tx.runAsync(
      `UPDATE activities SET isCompleted = ? WHERE id = ?;`,
      [isCompleted ? 1 : 0, id]
    );
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteActivity = async (id) => {
  const tx = await db();

  try {
    await tx.runAsync(`DELETE FROM activities WHERE id = ?;`, [id]);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export default db;