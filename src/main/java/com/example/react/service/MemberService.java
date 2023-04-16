package com.example.react.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.example.react.dto.MemberDTO;

public interface MemberService {
	
	public List<MemberDTO>listAll(HttpServletRequest req, Model model)
		throws ServletException,IOException;
	
	public void insertMember(MemberDTO dto)
			throws ServletException,IOException;
//	
//	public void updateMember(MemberDTO dto)
//			throws ServletException,IOException;
//	
//	public void deleteMember(int id)
//			throws ServletException,IOException;
//	
//	public MemberDTO selectMember(int id)
//			throws ServletException,IOException;
}
