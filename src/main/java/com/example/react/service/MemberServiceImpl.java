package com.example.react.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.react.dao.MemberMapper;
import com.example.react.dto.MemberDTO;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	private MemberMapper dao;
	
	@Override
	public List<MemberDTO> listAll(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - listAll()");
		List<MemberDTO> list;
		list = dao.memberList();
		
		return list;
	}

	@Override
	public void insertMember(MemberDTO dto) 
			throws ServletException, IOException {
		dao.insertMember(dto);
	}
//
//	@Override
//	public void updateMember(MemberDTO dto) 
//			throws ServletException, IOException {
//		dao.updateMember(dto);
//	}
//
//	@Override
//	public void deleteMember(int id) 
//			throws ServletException, IOException {
//		dao.deleteMember(id);
//	}
//
//	@Override
//	public MemberDTO selectMember(int id) 
//			throws ServletException, IOException {
//		MemberDTO dto = dao.findById(id);
//		return dto;
//	}

}
