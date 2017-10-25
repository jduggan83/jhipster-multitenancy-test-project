package com.mycompany.myapp.aop.zoo;

import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.domain.User;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Filter;

@Aspect
@Component
public class ZooAspect {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private final String fieldName =  "zooId";

    private final Logger log = LoggerFactory.getLogger(ZooAspect.class);

    /**
     * Run method if User service is hit.
     * Filter users based on which zoo the user is associated with.
     * Skip filter if user has no zoo
     */
    @Before("execution(* com.mycompany.myapp.service.UserService.*(..)) || execution(* com.mycompany.myapp.service.AnimalService.*(..))")
    public void beforeExecution() throws Throwable {
        String login = SecurityUtils.getCurrentUserLogin();
		
		if(login != null) {
			User user = userRepository.findOneByLogin(login).get();

			if (user.getZoo() != null) {
				Filter filter = entityManager.unwrap(Session.class).enableFilter("ZOO_FILTER");
				filter.setParameter(fieldName, user.getZoo().getId());
			}
		}
    }
}
