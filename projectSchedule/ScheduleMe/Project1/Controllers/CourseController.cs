﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Schedule_Bl;
using Schedule_Model;
namespace ScheduleMe.Controllers
{
    public class CourseController : ApiController
    {
        CourseService service;
        IEnumerable<Course> CoursesList;

        public CourseController()
        {
            service = new CourseService();
            CoursesList = service.GetAll();

        }
        // GET api/<controller>
        public IEnumerable<Course> Get()
        {
            return CoursesList;
        }
        public void Post(Course newCourse)
        {
            if (newCourse.Id != 0)
                service.Update(newCourse);
            else
                service.Insert(newCourse);
        }

        [Route("api/Course/RemoveCourse/{removedCourse}")]
        [HttpPost]
        public void RemoveCourse(Course removedCourse)
        {
            // CoursesList.Remove(CoursesList.Find(r => r.Id == removedCourse.Id));
            service.Delete(removedCourse);
        }

        [Route("api/Course/AddCourse/{newCourse}")]
        [HttpPost]
        public void AddCourse(Course newCourse)
        {
            service.Insert(newCourse);
        }
    }
}

/*
 לא לאפשר שמירה לשדות ריקים
*/
