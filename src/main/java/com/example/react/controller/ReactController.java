package com.example.react.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.react.dto.MemberDTO;
import com.example.react.service.MemberServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/members")
public class ReactController {

	private static final Logger logger = LoggerFactory.getLogger(ReactController.class);
	
	@Autowired
	private MemberServiceImpl service;
	
	// http://localhost:8081/members
	@GetMapping
	public List<MemberDTO> memberList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - memberList() >>>");
		
		List<MemberDTO> list = service.listAll(req, model);
		return list;
	}
	
	// insert
	@PostMapping
	public void insertMember(@RequestBody MemberDTO dto)
			throws ServletException, IOException {
				logger.info("<<< url - memberInsert() >>>");
				
				service.insertMember(dto);
			}
	
//	//Update
//	@PutMapping("/{id}")
//	public void updateMember(@PathVariable int id, @RequestBody MemberDTO dto)
//			throws ServletException, IOException {
//				logger.info("<<< url - memberUpdate() >>>");
//				
//				service.updateMember(dto);
//	}
//	
//	// SelectOne
//	@GetMapping("/{id}")
//	public MemberDTO selectMember(@PathVariable int id)
//			throws ServletException, IOException {
//				logger.info("<<< url - memberSelect() >>>");
//				
//				MemberDTO dto = service.selectMember(id);
//				return dto;
//	}
//	
//	//Delete
//	@DeleteMapping("/{id}")
//	public void deleteMember(@PathVariable int id)
//			throws ServletException, IOException {
//				logger.info("<<< url - memberDelete() >>>");
//				
//				service.deleteMember(id);
//			}
	}

