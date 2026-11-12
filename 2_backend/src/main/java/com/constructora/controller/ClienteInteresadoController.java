package com.constructora.controller;

import com.constructora.dto.ClienteInteresadoRequestDTO;
import com.constructora.dto.ClienteInteresadoResponseDTO;
import com.constructora.service.ClienteInteresadoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes-interesados")
public class ClienteInteresadoController {

    private final ClienteInteresadoService clienteInteresadoService;

    public ClienteInteresadoController(ClienteInteresadoService clienteInteresadoService) {
        this.clienteInteresadoService = clienteInteresadoService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteInteresadoResponseDTO>> obtenerTodos() {
        return ResponseEntity.ok(clienteInteresadoService.obtenerTodos());
    }

    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<ClienteInteresadoResponseDTO>> obtenerPorProyecto(@PathVariable Long proyectoId) {
        return ResponseEntity.ok(clienteInteresadoService.obtenerPorProyecto(proyectoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteInteresadoResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(clienteInteresadoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<ClienteInteresadoResponseDTO> crear(@Valid @RequestBody ClienteInteresadoRequestDTO dto) {
        ClienteInteresadoResponseDTO creado = clienteInteresadoService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        clienteInteresadoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
