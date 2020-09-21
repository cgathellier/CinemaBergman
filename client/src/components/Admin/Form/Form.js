// import React from 'react';

// function Form() {
//     return (
//         <div className={classes.container}>
//             <form className={classes.Form} onSubmit={e => onSubmit(e)}>
//                 <div className={classes.field}>
//                     <input
//                         type='text'
//                         placeholder='Titre *'
//                         value={title}
//                         name='title'
//                         required
//                         onChange={e => onChange(e)}
//                     ></input>
//                 </div>
//                 <div className={classes.field}>
//                     <input
//                         type='text'
//                         placeholder='Réalisateur *'
//                         value={director}
//                         name='director'
//                         required
//                         onChange={e => onChange(e)}
//                     ></input>
//                 </div>
//                 <div className={classes.field}>
//                     <input
//                         type='text'
//                         placeholder='Acteurs et actrices, séparés par une virgule *'
//                         value={actors}
//                         name='actors'
//                         required
//                         onChange={e => onChange(e)}
//                     ></input>
//                 </div>
//                 <div className={classes.field}>
//                     <input
//                         type='text'
//                         placeholder='Durée *'
//                         value={duration}
//                         name='duration'
//                         required
//                         onChange={e => onChange(e)}
//                     ></input>
//                 </div>
//                 <div className={[classes.field, classes.list].join(' ')}>
//                     <label htmlFor='Genre'>Genre *</label>
//                     <select
//                         type='text'
//                         value={genre}
//                         name='genre'
//                         required
//                         onChange={e => onChange(e)}
//                         id='Genre'
//                     >
//                         <option value='Comédie'>Comédie</option>
//                         <option value='Drame'>Drame</option>
//                         <option value='Historique'>Historique</option>
//                         <option value='Thriller'>Thriller</option>
//                         <option value='Horreur'>Horreur</option>
//                         <option value='Romance'>Romance</option>
//                         <option value='Science-Fiction'>Science-Fiction</option>
//                         <option value='Guerre'>Guerre</option>
//                         <option value='Action'>Action</option>
//                         <option value='Documentaire'>Documentaire</option>
//                         <option value='Aventure'>Aventure</option>
//                         <option value='Policier'>Policier</option>
//                     </select>
//                 </div>
//                 <div className={[classes.field, classes.list].join(' ')}>
//                     <label htmlFor='Classification'>Classification *</label>
//                     <select
//                         type='text'
//                         value={classification}
//                         name='classification'
//                         required
//                         onChange={e => onChange(e)}
//                         id='Classification'
//                     >
//                         <option value='Tous publics'>Tous publics</option>
//                         <option value='-12'>-12</option>
//                         <option value='-16'>-16</option>
//                         <option value='-18'>-18</option>
//                     </select>
//                 </div>
//                 <div className={classes.field}>
//                     <label htmlFor='release'>Date de sortie *</label>
//                     <input
//                         type='date'
//                         id='release'
//                         value={release}
//                         name='release'
//                         required
//                         onChange={e => onChange(e)}
//                     ></input>
//                 </div>
//                 <div className={classes.field}>
//                     <input
//                         type='text'
//                         placeholder='Synopsis *'
//                         value={synopsis}
//                         name='synopsis'
//                         required
//                         onChange={e => onChange(e)}
//                     ></input>
//                 </div>
//                 <div className={classes.field}>
//                     <p className={classes.addShowtimes}>Ajouter une séance *</p>
//                     <div className={classes.showtimesInputs}>
//                         <div>
//                             <label htmlFor='date'>Date *</label>
//                             <input
//                                 type='date'
//                                 id='date'
//                                 value={Day}
//                                 name='showtimes'
//                                 onChange={e => onDayChange(e)}
//                             ></input>
//                         </div>
//                         <div>
//                             <label htmlFor='hour'>Heure *</label>
//                             <input
//                                 type='time'
//                                 id='hour'
//                                 value={Hour}
//                                 name='showtimes'
//                                 onChange={e => onHourChange(e)}
//                             ></input>
//                         </div>
//                     </div>
//                     <div className={classes.submitSchedule} onClick={() => addShowtime()}>
//                         Ajouter la séance
//                     </div>
//                     <div className={classes.st_list}>{showtimesElt}</div>
//                 </div>
//                 <div className={classes.field}>
//                     <label htmlFor='poster'>Affiche du film *</label>
//                     <input
//                         type='file'
//                         accept='.jpeg,.jpg,.png'
//                         id='poster'
//                         name='image'
//                         required
//                         onChange={e => onPosterChange(e)}
//                     ></input>
//                 </div>
//                 <div className={classes.field}>
//                     <label htmlFor='snap'>Image extraite du film *</label>
//                     <input
//                         type='file'
//                         accept='.jpeg,.jpg,.png'
//                         id='snap'
//                         name='image'
//                         required
//                         onChange={e => onSnapChange(e)}
//                     ></input>
//                 </div>

//                 <input type='submit' className={classes.submit} value='Continuer'></input>
//             </form>
//         </div>
//     );
// }

// export default Form;
