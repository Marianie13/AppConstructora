package com.constructora.controller;

import com.constructora.dto.ProyectoRequestDTO;
import com.constructora.dto.ProyectoResponseDTO;
import com.constructora.service.ProyectoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proyectos")
public class ProyectoController {

    private final ProyectoService proyectoService;

    public ProyectoController(ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    @GetMapping
    public ResponseEntity<List<ProyectoResponseDTO>> obtenerTodos() {
        return ResponseEntity.ok(proyectoService.obtenerTodos());
    }

    @GetMapping("/destacados")
    public ResponseEntity<List<ProyectoResponseDTO>> obtenerDestacados() {
        return ResponseEntity.ok(proyectoService.obtenerDestacados());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProyectoResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(proyectoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<ProyectoResponseDTO> crear(@Valid @RequestBody ProyectoRequestDTO dto) {
        ProyectoResponseDTO creado = proyectoService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProyectoResponseDTO> actualizar(@PathVariable Long id, @Valid @RequestBody ProyectoRequestDTO dto) {
        ProyectoResponseDTO actualizado = proyectoService.actualizar(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        proyectoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
